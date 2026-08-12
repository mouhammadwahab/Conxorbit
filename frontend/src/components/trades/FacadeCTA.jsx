import CtaSection from "../common/CtaSection";

export default function FacadeCTA({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, primary, secondary } = content;

  return (
    <CtaSection
      badge={eyebrow}
      title={title}
      body={body}
      primary={primary}
      secondary={secondary}
      ariaLabel={eyebrow || title}
    />
  );
}
