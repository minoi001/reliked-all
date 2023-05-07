import Link from 'next/link';
import Image from 'next/image';
import { formatter } from '../../utils/helpers';

const ProductCard = ({ hit }) => {
  const { handle, title } = hit;
  const image = hit.image
    ? hit.image
    : 'https://cdn.shopify.com/s/files/1/2481/5934/files/Loading_icon_70beb786-4ca6-4438-89a3-810f9c41ac15.gif?v=1674579018';
  const altText = hit.body_html_safe ? hit.body_html_safe : 'image';

  console.log(hit);

  const price = hit.price;
  return (
    <div>
      <Link href={`/products/${handle}`} className='z-0'>
        <div className='group z-0'>
          <div className='w-full bg-offWhite overflow-hidden z-0'>
            <div className='grid group-hover:opacity-75-20 w-full aspect-4/5 p-3 z-0 place-items-center'>
              <Image
                src={image}
                alt={altText}
                width='446'
                height='533'
                className='object-contain w-36 max-h-12 xxs:max-h-24 xs:max-h-48 sm:max-h-60'
              />
            </div>
          </div>
          <h3 className='mt-4 text-lg font-medium text-gray-900'>{title}</h3>
          <h4 className='mt-4 text-md font-medium text-gray-900'>{formatter.format(price)}</h4>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
