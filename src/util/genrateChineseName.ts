// 生成姓名工具函数
// 姓氏和名的文件在public目录下的firstName.json和lastName.json

// 用于缓存数据
let nameData: { firstName: string[], lastName: string[] } | null = null

async function init(): Promise<{ firstName: string[], lastName: string[] }> {
  // 如果以获取到数据，返回已有的数据
  if (nameData) return nameData

  try {
    // 获取数据
    const [firstNameData, lastNameData] = await Promise.all([
      fetch('/firstName.json'),
      fetch('/lastName.json'),
    ])

    // 如果获取失败，抛出错误
    if (!firstNameData.ok) throw new Error(`获取姓氏失败: ${firstNameData.status}`)
    if (!lastNameData.ok) throw new Error(`获取名字失败: ${lastNameData.status}`)

    // 解析数据
    const [firstName, lastName] = await Promise.all([
      firstNameData.json(),
      lastNameData.json(),
    ])

    if (firstName.length === 0) throw new Error("姓名数据格式错误，必须是数组")
    if (lastName.length === 0) throw new Error("姓名数据为空，无法生成姓名")

    // 缓存数据
    nameData = {
      firstName,
      lastName,
    }

    return nameData
  } catch (error) {
    throw new Error(`初始化姓名数据失败: ${error}`)
  }

}


export default async function genrateChineseName(): Promise<string> {
  const { firstName, lastName } = await init()

  if (!firstName || !lastName) throw new Error('姓和名数据为空，无法生成姓名')

  const firstNameIndex = Math.floor(Math.random() * firstName.length)
  const lastNameIndex = Math.floor(Math.random() * lastName.length)
  console.log(firstName[firstNameIndex], lastName[lastNameIndex])

  return `${firstName[firstNameIndex]}${lastName[lastNameIndex]}`
}
