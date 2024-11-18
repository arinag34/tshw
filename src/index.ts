enum GridFilterTypeEnum {
    Match = "match",
    Range = "range",
    Values = "values",
}

type GridFilterValue<T> = {
    type: GridFilterTypeEnum.Match;
    filter: Extract<T, string | number>;
};

type GridFilterRange<T> = {
    type: GridFilterTypeEnum.Range;
    filter: Extract<T, number>;
    filterTo: Extract<T, number>;
};

type GridFilterSetValues<T> = {
    type: GridFilterTypeEnum.Values;
    values: T[];
};

type GridFilter<T> = GridFilterValue<T> | GridFilterRange<T> | GridFilterSetValues<T>;

interface FilterableList<T> {
    applySearchValue(filter: GridFilterValue<string>): void;
    applyFiltersValue(filters: Partial<Record<keyof T, GridFilter<any>>>): void;
    searchByName(name: string): T[];
}

interface Movie {
    title: string;
    year: number;
    rating: number;
    awards: string[];
}

class MovieList implements FilterableList<Movie> {
    private readonly movies: Movie[] = [];
    private filters: Partial<Record<keyof Movie, GridFilter<any>>> = {};
    private searchFilter: GridFilterValue<string> | null = null;

    constructor(movies: Movie[]) {
        this.movies = movies;
    }

    applySearchValue(filter: GridFilterValue<string>): void {
        if (filter.type !== GridFilterTypeEnum.Match) {
            throw new Error("Search filter must be of type Match.");
        }
        this.searchFilter = filter;
    }

    applyFiltersValue(filters: Partial<Record<keyof Movie, GridFilter<any>>>): void {
        this.filters = filters;
    }

    private filterMovies(): Movie[] {
        let result = this.movies;

        if (this.searchFilter) {
            result = result.filter((movie) => movie.title === this.searchFilter!.filter);
        }

        for (const key in this.filters) {
            const filter = this.filters[key as keyof Movie];
            if (!filter) continue;

            result = result.filter((movie) => {
                const value = movie[key as keyof Movie];

                if (filter.type === GridFilterTypeEnum.Match) {
                    return value === filter.filter;
                } else if (filter.type === GridFilterTypeEnum.Range) {
                    return (
                        typeof value === "number" &&
                        value >= filter.filter &&
                        value <= (filter as GridFilterRange<number>).filterTo
                    );
                } else if (filter.type === GridFilterTypeEnum.Values) {
                    if (Array.isArray(value)) {
                        return filter.values.some((val) => value.includes(val));
                    }
                    return (filter.values as any[]).includes(value);
                }
                return true;
            });
        }

        return result;
    }

    searchByName(name: string): Movie[] {
        this.applySearchValue({ type: GridFilterTypeEnum.Match, filter: name });
        return this.filterMovies();
    }

    getMovieByYear(year: number): Movie[] {
        this.applyFiltersValue({
            year: { type: GridFilterTypeEnum.Match, filter: year },
        });
        return this.filterMovies();
    }

    getMovieByRating(rating: number): Movie[] {
        this.applyFiltersValue({
            rating: { type: GridFilterTypeEnum.Match, filter: rating },
        });
        return this.filterMovies();
    }

    getMoviesWithAwards(awards: string[]): Movie[] {
        this.applyFiltersValue({
            awards: { type: GridFilterTypeEnum.Values, values: awards },
        });
        return this.filterMovies();
    }
}

interface Category {
    name: string;
    movies: Movie[];
}

class CategoryList implements FilterableList<Category> {
    private categories: Category[] = [];
    private searchFilter: GridFilterValue<string> | null = null;

    constructor(categories: Category[]) {
        this.categories = categories;
    }

    applySearchValue(filter: GridFilterValue<string>): void {
        if (filter.type !== GridFilterTypeEnum.Match) {
            throw new Error("Search filter must be of type Match.");
        }
        this.searchFilter = filter;
    }

    applyFiltersValue(): void {
        throw new Error("Category list does not support advanced filtering.");
    }

    searchByName(name: string): Category[] {
        if (!this.searchFilter) {
            this.applySearchValue({ type: GridFilterTypeEnum.Match, filter: name });
        }
        return this.categories.filter((category) => category.name === this.searchFilter!.filter);
    }
}

const movies: Movie[] = [
    { title: "Mean Girls", year: 2010, rating: 8.8, awards: ["Oscar"] },
    { title: "Fight Club", year: 2014, rating: 9.6, awards: ["Oscar", "BAFTA"] },
    { title: "Dunkirk", year: 2017, rating: 7.9, awards: [] },
];
const movieList = new MovieList(movies);

const categories: Category[] = [
    {name: "Drama", movies: movies},
]
const categoryList = new CategoryList(categories);

console.log(movieList.getMovieByYear(2010));

console.log(movieList.getMovieByRating(7.9));

console.log(movieList.getMoviesWithAwards(["BAFTA"]));

console.log(JSON.stringify(categoryList.searchByName("Drama"), null, 2));

