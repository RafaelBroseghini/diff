import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('token');
    const octokit = github.getOctokit(githubToken);

    const context = github.context;

    if (context.payload.pull_request) {
      const { data: pullRequest } = await octokit.rest.pulls.get({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number
      });
      core.debug(JSON.stringify(pullRequest))
    }


  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
