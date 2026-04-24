// test all timezone things with Berlin (mocking different ones is not possible)
export const setup = () => {
  process.env.TZ = "Europe/Berlin"
}
