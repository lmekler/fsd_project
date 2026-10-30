// utility functions that convert strings into various naming conventions, 
// useful for reducing redundancy in input attribute definitions, such as
// name="postalCode", placeholder="Postal code" className="postal-code", label="Postal Code"

// to use these functions, pass a string with words seperated by whitespace

export function toCamelCase(name: string): string
{
    return name[0].toLowerCase() + toTitle(name).substring(1, name.length).replace(" ", "")
}

export function toCapitalized(name: string): string
{
    return name[0].toUpperCase() + name.substring(1, name.length)
}

export function toKebabCase(name: string): string
{
    return (name.toLowerCase().replace(" ", "-").toString())
}

export function toTitle(name: string): string
{
    let words = name.split(" ")

    words.forEach(word =>
    {
        words[words.indexOf(word)] = word[0].toUpperCase() + word.substring(1, word.length) 
    })

    return words.join(" ")
}