const users = []

exports.addUser = ({ id, name }) => {
  name = name.trim()
  const existing = users.find((user) => user.name === name)
  if (existing) {
    return { error: 'user already exists' }
  }
  const user = {
    id,
    name,
  }
  users.push(user)
  return {
    user,
  }
}

exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

exports.getUsers = () => {
  return users
}

exports.getUser = (id) => {
  return users.find((user) => user.id === id)
}
