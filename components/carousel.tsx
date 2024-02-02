import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import Image from 'next/image';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products];

  return (
    // <div className="w-full overflow-x-auto px-10 pb-6 pt-1">
    //   <ul className="flex flex-wrap justify-between gap-4">
    //     {carouselProducts.map((product, i) => (
    //       <li
    //         key={`${product.handle}${i}`}
    //         className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[430px] flex-none md:w-1/3"
    //       >
    //         <Link href={`/product/${product.handle}`} className="relative h-full w-full">
    //           <GridTileImage
    //             alt={product.title}
    //             label={{
    //               title: product.title,
    //               amount: product.priceRange.maxVariantPrice.amount,
    //               currencyCode: product.priceRange.maxVariantPrice.currencyCode
    //             }}
    //             src={product.featuredImage?.url}
    //             fill
    //             sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
    //           />
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="mx-10 mt-5 grid gap-10 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
      {carouselProducts.map((product, i) => (
        <div key={product.title} className="group relative my-6">
          <Link href={`/product/${product.handle}`}>
            <Image
              src={product.featuredImage?.url}
              alt="Product image"
              className="h-[300px] w-full rounded-md rounded-b-none object-cover object-center transition-all duration-300 hover:scale-95 lg:h-[300px] lg:w-full"
              width={300}
              height={300}
            />
          </Link>

          <div className="mt-1">
            <div>
              <h3 className="text-md mt-4 line-clamp-2 font-medium">
                <Link href={`/product/${product.handle}`}>{product.title}</Link>
              </h3>
            </div>
            <p className="mt-2 text-sm font-medium">
              $ {product.priceRange.maxVariantPrice.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
