let photographyTags = [];

if (props.photography === "Stock") {
  photographyTags = ["StockPhoto", "AppExclusive", "MakeLive"];
} else if (props.photography === "Desk") {
  photographyTags = ["DeskPhoto", "Photographed", "MakeLive"];
} else {
  photographyTags = ["MachinePhoto"];
}

let discountTags = [];
if (!props.tags.includes("NoDiscount")) {
  discountTags = ["Eligible"];
} else {
  discountTags = ["NoDiscount"];
}

// Tags
let ourTags = [
  props.condition,
  props.packaging,
  props.colour,
  props.brand,
  props.size,
  props.type,
  props.age,
  props.gender,
  props.userName,
  props.occasion.toString(),
  `Week ${props.wkYr}`,
  props.tags.toString(),
  photographyTags.toString(),
  discountTags.toString(),
];
