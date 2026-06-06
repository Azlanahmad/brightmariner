import { spawnSync, execSync } from 'child_process';
import readline from 'readline';

async function deploy() {
    try {
        // 1. Stage all changes
        console.log('Staging changes...');
        spawnSync('git', ['add', '.'], { stdio: 'inherit' });

        // 2. Check if there are any staged/unstaged changes to commit
        const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
        if (!status) {
            console.log('No changes to deploy.');
            process.exit(0);
        }

        // 3. Get commit message from arguments or prompt
        let commitMessage = process.argv.slice(2).join(' ').trim();

        if (!commitMessage) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            commitMessage = await new Promise((resolve) => {
                rl.question('Enter commit message: ', (answer) => {
                    rl.close();
                    resolve(answer.trim());
                });
            });
        }

        if (!commitMessage) {
            console.error('Error: Deploy aborted. Commit message cannot be empty.');
            process.exit(1);
        }

        // 4. Commit changes
        console.log(`Committing changes with message: "${commitMessage}"`);
        const commitResult = spawnSync('git', ['commit', '-m', commitMessage], { stdio: 'inherit' });
        if (commitResult.status !== 0) {
            console.error('Git commit failed.');
            process.exit(1);
        }

        // 5. Push to origin main
        console.log('Pushing changes to origin main...');
        const pushResult = spawnSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' });
        if (pushResult.status !== 0) {
            console.error('Git push failed.');
            process.exit(1);
        }

        console.log('Deployment successful!');
    } catch (error) {
        console.error('An error occurred during deployment:', error.message);
        process.exit(1);
    }
}

deploy();
