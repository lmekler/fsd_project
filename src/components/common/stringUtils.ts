// utility functions that convert strings into various naming conventions, 
// useful for reducing redundancy in input attribute definitions, such as
// name="postalCode", placeholder="Postal code" className="postal-code", label="Postal Code"

// to use these functions, pass a string with words seperated by whitespace

export function toCamelCase(string: string): string
{
    return string[0].toLowerCase() + toTitle(string).substring(1, string.length).replace(" ", "")
}

export function toCapitalized(string: string): string
{
    return string[0].toUpperCase() + string.substring(1, string.length)
}

export function toKebabCase(string: string): string
{
    return (string.toLowerCase().replace(" ", "-").toString())
}

export function toTitle(string: string): string
{
    let words = string.split(" ")

    words.forEach(word =>
    {
        words[words.indexOf(word)] = word[0].toUpperCase() + word.substring(1, word.length) 
    })

    return words.join(" ")
}