const doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: [59, 23],
});

const createBarcode = (SKU, code, url) => {
  doc.addFileToVFS('LilGrotesk-Regular-normal.ttf', font);
  doc.addFont('LilGrotesk-Regular-normal.ttf', 'LilGrotesk-Regular', 'normal');
  // doc.setFont("LilGrotesk-Regular");
  doc.setFontSize(7);
  if (props.photography === 'Machine') {
    doc.text('P', 59, 2, {
      align: 'right',
      maxWidth: 59,
    });
  }
  doc.text(titleCase(props.styleName.trim()), 29.5, 2, {
    align: 'center',
    maxWidth: 59,
  });
  doc.text(`${props.brand}  |  ${props.colour}  |  ${props.size}`, 0, 8, {
    align: 'left',
    maxWidth: 50,
  });
  doc.text(`RRP £${props.RRP}`, 59, 8, {
    align: 'right',
    maxWidth: 59,
  });
  if (SKU && url && code) {
    doc.text(SKU, 29.5, 12, {
      align: 'center',
      maxWidth: 59,
    });

    doc.addImage(url, 'png', 0, 14, 59, 6);
    doc.text(code, 29.5, 23, {
      align: 'center',
      maxWidth: 59,
    });
    doc.save(`${code}.pdf`);
  } else {
    doc.text(props.SKU, 29.5, 12, {
      align: 'center',
      maxWidth: 59,
    });

    doc.addImage(props.barcodeURL, 'png', 0, 14, 59, 6);
    doc.text(props.barcode, 29.5, 23, {
      align: 'center',
      maxWidth: 59,
    });
    doc.save(`${props.barcode}.pdf`);
  }
};
