export default function errorMessage(error) {
  if (error?.data?.message) {
    return error.data.message
  }
  if (error?.data?.error?.message) {
    return error.data.error.message
  }
  if (error?.error) {
    return error.error
  }
  if (error?.data?.status?.error_message) {
    return error.data.status.error_message
  }
  if (error?.data?.error) {
    return error.data.error
  }
  if (typeof error === "string") {
    return error
  }
  return "Undefined error"
}
