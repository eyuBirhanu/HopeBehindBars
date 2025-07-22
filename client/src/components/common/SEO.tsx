import React from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  imageUrl,
  url,
  noIndex = false,
}) => {
  const defaultTitle = "Hope Behind Bars | Restoring Dignity, Rebuilding Lives";
  const defaultDescription =
    "We empower incarcerated women in Ethiopia with essential skills, vital support, and a second chance, fostering entrepreneurship and hope from within prison walls.";
  const siteUrl = import.meta.env.VITE_SITE_URL || "http://localhost:5174";
  const defaultImageUrl = `${siteUrl}/default-social-image.png`;
  const defaultKeywords =
    "prison reform, incarcerated women, Ethiopia, non-profit, rehabilitation, second chance, skills training";

  const seo = {
    title: title ? `${title} | Hope Behind Bars` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: imageUrl || defaultImageUrl,
    url: url ? `${siteUrl}${url}` : siteUrl,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Hope Behind Bars" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </>
  );
};

export default SEO;
