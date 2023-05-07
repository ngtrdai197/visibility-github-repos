const { Octokit } = require("@octokit/rest");
require("dotenv").config();

// TODO: Add access token => generate from github setting of the user
const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
});

const ownerName = "ngtrdai197";
const makePublic = true;

async function makeReposPublic() {
  const repos = await octokit.paginate("GET /user/repos", {
    type: "private",
  });
  const reposToMakePublic = repos.map((el) => el.name);

  for (const repoName of []) {
    try {
      await octokit.repos.update({
        owner: ownerName,
        repo: repoName,
        private: !makePublic,
      });
      console.log(
        `${repoName} đã được chuyển thành ${
          makePublic ? "công khai" : "riêng tư"
        }.`
      );
    } catch (error) {
      console.log(`Đã xảy ra lỗi khi chuyển ${repoName}: ${error.message}`);
    }
  }
}

makeReposPublic();
