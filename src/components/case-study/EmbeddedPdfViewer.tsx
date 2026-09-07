type EmbeddedPdfViewerProps = {
  src: string;
  title: string;
};

/**
 * In-page PDF reader using the browser viewer so paging a long paper stays reliable.
 */
export function EmbeddedPdfViewer({ src, title }: EmbeddedPdfViewerProps) {
  const viewerSrc = `${src}#toolbar=1&navpanes=1&pagemode=thumbs&scrollbar=1&view=FitH`;

  return (
    <div className="pdf-reader landing-case-panel overflow-hidden p-0">
      <object
        data={viewerSrc}
        type="application/pdf"
        aria-label={title}
        className="pdf-reader-frame"
      >
        <iframe src={viewerSrc} title={title} className="pdf-reader-frame" />
      </object>
    </div>
  );
}
