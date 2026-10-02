import Button from "../../../common/button/Button";

interface CategoryFormProps {
    categories: (string | undefined)[]
    onCategoryFilter: (category: string) => void;
}

export default function CategoryForm({
    categories,
    onCategoryFilter
}: CategoryFormProps) {
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData: FormData = new FormData(e.currentTarget);
        const category = formData.get("category");

        if (typeof category !== "string") {
            return;
        }

        onCategoryFilter(category);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="category-filter">
                Filter by Category
            </label>
            <select
                id="category-filter"
                name="category"
                defaultValue=""
            >
                <option value="">
                    Select Category
                </option>

                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>
            <Button type="submit">
                Filter
            </Button>
        </form>
    )
}