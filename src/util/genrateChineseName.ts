export default async function genrateChineseName(): Promise<string> {
  const firstName = await fetch('/firstName.json').then((res) => res.json())
  const lastName = await fetch('/lastName.json').then((res) => res.json())

  if (!firstName || !lastName) throw new Error('firstName or lastName is not found')

  const firstNameIndex = Math.floor(Math.random() * firstName.length)
  const lastNameIndex = Math.floor(Math.random() * lastName.length)
  console.log(firstName[firstNameIndex], lastName[lastNameIndex])

  return `${firstName[firstNameIndex]}${lastName[lastNameIndex]}`
}
