import { getCollection } from "../../lib/shopify.js";

export default function CollectionPage({ collection }) {
  // TODO: Some products seem to return empty (on Algolia but not on Shopify/ wrong handle?)
  return (
    <div>
      {collection.map((c, i) => (
        <p key={i}>{c.node.title}</p>
      ))}
    </div>
  );
}
export async function getServerSideProps({ params }) {
  // Fetch data based on the slug parameter
  const collection = await getCollection(params.collection);

  return {
    props: {
      collection,
    },
  };
}
