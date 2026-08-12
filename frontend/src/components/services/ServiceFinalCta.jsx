import CtaSection from "../common/CtaSection";

export default function ServiceFinalCta({ content }) {
  if (!content) return null;
  const { badge, title, body, primary, secondary } = content;

  return (
    <CtaSection
      badge={badge}
      title={title}
      body={body}
      primary={primary}
      secondary={secondary}
      ariaLabel={badge}
    />
  );
}
