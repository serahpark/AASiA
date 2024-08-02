export const shortenContent = (contentString) => {
  const words = contentString.split(' ')
  const wordLimit = 20
  const charLimit = 200
  const wordCountStr = words.length <= wordLimit ? contentString : words.slice(0, wordLimit).join(' ') + '...'
  let charCountStr

  if (contentString.length <= charLimit) {
    charCountStr = contentString
  } else {
    const sliced = contentString.slice(0, charLimit).split(' ')
    charCountStr = sliced.slice(0, sliced.length - 1).join(' ') + '...'
  }
  return wordCountStr.length < charCountStr ? wordCountStr : charCountStr
}

export const readableDate = (isoDateStr) => {
  const date = new Date(isoDateStr)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}