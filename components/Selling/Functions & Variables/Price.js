if (props.type.includes('Beauty')) {
  if (props.packaging.includes('Box') || props.packaging.includes('Sealed')) {
    ourPrice = props.RRP * 0.7;
    props.setPrice(ourPrice);
  } else {
    ourPrice = props.RRP * 0.6;
    props.setPrice(ourPrice);
  }
} else {
  if (props.RRP >= 400) {
    if (props.condition.includes('Never')) {
      ourPrice = props.RRP * 0.55;
      props.setPrice(ourPrice);
    } else if (props.condition.includes('Hardly')) {
      ourPrice = props.RRP * 0.4;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Pre-worn' || props.condition === 'Used') {
      ourPrice = props.RRP * 0.35;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Sold As Seen') {
      ourPrice = props.RRP * 0.3;
      props.setPrice(ourPrice);
    }
  } else if (props.RRP >= 150) {
    if (props.condition.includes('Never')) {
      ourPrice = props.RRP * 0.55;
      props.setPrice(ourPrice);
    } else if (props.condition.includes('Hardly')) {
      ourPrice = props.RRP * 0.4;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Pre-worn' || props.condition === 'Used') {
      ourPrice = props.RRP * 0.33;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Sold As Seen') {
      ourPrice = props.RRP * 0.25;
      props.setPrice(ourPrice);
    }
  } else if (props.RRP > 40) {
    if (props.condition.includes('Never')) {
      ourPrice = props.RRP * 0.52;
      props.setPrice(ourPrice);
    } else if (props.condition.includes('Hardly')) {
      ourPrice = props.RRP * 0.35;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Pre-worn' || props.condition === 'Used') {
      ourPrice = props.RRP * 0.33;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Sold As Seen') {
      ourPrice = props.RRP * 0.25;
      props.setPrice(ourPrice);
    }
  } else {
    if (props.condition.includes('Never')) {
      ourPrice = props.RRP * 0.33;
      props.setPrice(ourPrice);
    } else if (props.condition.includes('Hardly')) {
      ourPrice = props.RRP * 0.25;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Pre-worn' || props.condition === 'Used') {
      ourPrice = props.RRP * 0.2;
      props.setPrice(ourPrice);
    } else if (props.condition === 'Sold As Seen') {
      ourPrice = props.RRP * 0.1;
      props.setPrice(ourPrice);
    }
  }
}
