type Page<T> = {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
}

export default Page;