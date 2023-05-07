// Title
let ourTitle = "";
let ourStyleName = ` ${props.styleName} `;
if (props.colour === "No Shade") {
  if (props.brand === "Unbranded") {
    if (titleCase(ourStyleName).includes(` ${props.colour} `)) {
      ourTitle = `${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    } else {
      ourTitle = `${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    }
  } else {
    if (titleCase(ourStyleName).includes(` ${props.colour} `)) {
      ourTitle = `${props.brand.trim()} ${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    } else {
      ourTitle = `${props.brand.trim()} ${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    }
  }
} else {
  if (props.brand === "Unbranded") {
    if (titleCase(ourStyleName).includes(` ${props.colour} `)) {
      ourTitle = `${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    } else {
      ourTitle = `${titleCase(props.colour.trim())} ${titleCase(
        props.styleName.trim(),
      )} ${props.size.trim()}`;
    }
  } else {
    if (titleCase(ourStyleName).includes(` ${props.colour} `)) {
      ourTitle = `${props.brand.trim()} ${titleCase(props.styleName.trim())} ${props.size.trim()}`;
    } else {
      ourTitle = `${props.brand.trim()} ${titleCase(props.colour.trim())} ${titleCase(
        props.styleName.trim(),
      )} ${props.size.trim()}`;
    }
  }
}
