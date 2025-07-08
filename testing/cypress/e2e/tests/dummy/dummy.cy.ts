
describe("Dummy", () => {

  before(function () {
  });

  it("Dummy", () => {
    const milliseconds = new Date().getTime();
    const testData = {
      username: "pri-" + milliseconds,
      email: `pri@cypress-${milliseconds}.io`,
    };
    const num1 = 2
    const num2 = 3
    const sum = num1 + num2
    const expectedSum = 5
    expect(sum).to.equal(expectedSum)
  })
})