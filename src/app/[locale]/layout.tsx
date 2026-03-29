import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import LoadingScreen from "@/components/LoadingScreen";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-space",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });
     return {
         title: t("title"),
         description: t("description"),
         icons: {
             icon: "/elektrolight transparent logo.png",
             shortcut: "/elektrolight transparent logo.png",
             apple: "/elektrolight transparent logo.png",
         },
     };
}

export function generateStaticParams() {
    return [{ locale: "hr" }, { locale: "en" }, { locale: "de" }];
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans`}>
                <NextIntlClientProvider messages={messages}>
                    <LoadingScreen>
                        {children}
                    </LoadingScreen>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
