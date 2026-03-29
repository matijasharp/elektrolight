import { google } from "googleapis";
import { BlogPost, BlogSection } from "@/data/blog";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getSheetsInstance() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n");
    
    // The debug log has been removed to prevent potential sensitive info disclosure in logs

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: privateKey,
        },
        scopes: SCOPES,
    });

    return google.sheets({ version: "v4", auth });
}

/**
 * Simple markdown-to-BlogSection parser
 * Supports:
 * ## Heading -> heading
 * - Item -> list
 * > Callout -> callout
 * Everything else -> paragraph
 */
function parseMarkdownToSections(content: string): BlogSection[] {
    if (!content) return [];

    const lines = content.split(/\r?\n/);
    const sections: BlogSection[] = [];
    let currentListItems: string[] = [];

    const flushList = () => {
        if (currentListItems.length > 0) {
            sections.push({ type: "list", items: [...currentListItems] });
            currentListItems = [];
        }
    };

    for (const line of lines) {
        const trimmed = line.trim();
        
        if (!trimmed) {
            flushList();
            continue;
        }

        // Heading
        if (trimmed.startsWith("##")) {
            flushList();
            sections.push({ type: "heading", text: trimmed.replace(/^##\s+/, "") });
        }
        // List item
        else if (trimmed.startsWith("- ")) {
            currentListItems.push(trimmed.replace(/^- \s*/, ""));
        }
        // Callout
        else if (trimmed.startsWith("> ")) {
            flushList();
            sections.push({ type: "callout", text: trimmed.replace(/^>\s+/, "") });
        }
        // Paragraph
        else {
            flushList();
            sections.push({ type: "paragraph", text: trimmed });
        }
    }

    flushList();
    return sections;
}

import { unstable_cache } from "next/cache";

async function fetchBlogPostsUncached(): Promise<BlogPost[]> {
    try {
        const sheets = await getSheetsInstance();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Blog!A2:Z", // Assumes headers are in row 1
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        return rows
            .filter((row) => row[4]?.toUpperCase() === "TRUE") // Visible column
            .map((row) => {
                const [
                    slug,
                    publishedAt,
                    readingMinutes,
                    category,
                    _visible,
                    title_hr, title_en, title_de,
                    excerpt_hr, excerpt_en, excerpt_de,
                    content_hr, content_en, content_de,
                    tags_hr, tags_en, tags_de,
                    metaDescription_hr, metaDescription_en, metaDescription_de
                ] = row;

                return {
                    slug,
                    publishedAt,
                    readingMinutes: parseInt(readingMinutes) || 0,
                    category: (category as any) || "savjeti",
                    translations: {
                        hr: {
                            title: title_hr,
                            metaDescription: metaDescription_hr,
                            excerpt: excerpt_hr,
                            content: parseMarkdownToSections(content_hr),
                            tags: tags_hr?.split(",").map((s: string) => s.trim()) || [],
                        },
                        en: {
                            title: title_en,
                            metaDescription: metaDescription_en,
                            excerpt: excerpt_en,
                            content: parseMarkdownToSections(content_en),
                            tags: tags_en?.split(",").map((s: string) => s.trim()) || [],
                        },
                        de: {
                            title: title_de,
                            metaDescription: metaDescription_de,
                            excerpt: excerpt_de,
                            content: parseMarkdownToSections(content_de),
                            tags: tags_de?.split(",").map((s: string) => s.trim()) || [],
                        },
                    },
                };
            });
    } catch (error: any) {
        console.error("Error fetching blog posts from Google Sheets:", {
            message: error.message,
            status: error.status,
            code: error.code,
            range: "Blog!A2:Z"
        });
        return [];
    }
}

async function fetchProjectImagesUncached(): Promise<string[]> {
    try {
        const sheets = await getSheetsInstance();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Projects!A2:C",
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        return rows
            .filter((row) => row[2]?.toUpperCase() === "TRUE") // Visible column
            .map((row) => row[1]); // Image URL column
    } catch (error: any) {
        console.error("Error fetching project images from Google Sheets:", {
            message: error.message,
            status: error.status,
            code: error.code,
            range: "Projects!A2:C"
        });
        return [];
    }
}

// Wrapper caching Google Sheets API results to heavily speed up page loads.
export const fetchBlogPosts = unstable_cache(
    fetchBlogPostsUncached,
    ["blog-posts-cache"],
    { revalidate: 60, tags: ["blog"] }
);

export const fetchProjectImages = unstable_cache(
    fetchProjectImagesUncached,
    ["project-images-cache"],
    { revalidate: 60, tags: ["projects"] }
);
