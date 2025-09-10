import type { ProductProps } from "../../interfaces/Product.interface";

function sortProducts(
    products: ProductProps[],
    order1: string,
    order2: string,
    order3: string,
    sortType: 'asc' | 'desc'
): ProductProps[] {
    const keys = [order1, order2, order3].filter(Boolean) as (keyof ProductProps)[];

    const sorted = [...products].sort((a, b) => {
        for (let key of keys) {
        const valA = (a[key] ?? '').toString().toLowerCase();
        const valB = (b[key] ?? '').toString().toLowerCase();

        if (valA < valB) return sortType === 'asc' ? -1 : 1;
        if (valA > valB) return sortType === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return sorted;
}

export default sortProducts;