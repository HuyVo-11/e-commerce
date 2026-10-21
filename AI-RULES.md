# AI-Rules.md

## 1. Authorized Workspace

The only authorized workspace is:

`C:\Users\LENOVO\e-commerce`

- Do not access, read, modify, create, delete, or execute files outside this workspace unless the user explicitly approves the exact action.
- Do not access or operate on other projects, including `C:\Users\LENOVO\itest-cms`.
- Do not start, stop, restart, inspect, or modify services belonging to another project.
- Do not assume that filesystem or operating-system access implies user authorization.

## 2. Explicit Approval

Ask for approval before any action that is not clearly authorized by the current task.

Approval is required before:
- Installing, removing, or upgrading dependencies.
- Modifying system settings, environment variables, or global configuration.
- Starting, stopping, restarting, or terminating processes.
- Running destructive, disruptive, or irreversible commands.
- Accessing resources outside the authorized workspace.
- Committing, pushing, resetting, rebasing, or modifying Git history.
- Performing cleanup, recovery, or rollback actions beyond the original task.
- Running commands with uncertain targets or side effects.

Approval for one action does not authorize other actions.

## 3. Terminal Safety

- Run commands only when their purpose and effects are understood.
- Prefer commands whose effects are limited to the authorized workspace.
- Never use `Stop-Process` or `taskkill` based only on a port number.
- Never terminate every process associated with a port without verifying each process individually.
- Never terminate a process unless the exact target is identified and the user has approved the action.
- Do not assume that a process belongs to this project merely because it uses a familiar port.
- If a command could affect another project or system resource, stop and request approval.

## 4. File Safety

- Do not modify unrelated files.
- Do not delete files, folders, dependencies, or configuration without explicit approval.
- Do not overwrite user changes.
- Inspect relevant files before editing them.
- Review the resulting diff after making authorized changes.
- Do not access another project to troubleshoot the current project.

## 5. No Unauthorized Recovery

If a command fails or an unexpected side effect occurs:

1. Stop all further actions immediately.
2. Do not attempt to fix, restore, restart, or clean up anything automatically.
3. Report the exact command executed and its known or potential impact.
4. Wait for explicit user instructions.

Never perform an unauthorized action to compensate for an earlier mistake.

## 6. Task Boundaries

- Perform only the task requested by the user.
- Do not add features, refactor unrelated code, or change architecture without approval.
- For ambiguous tasks, ask for clarification before taking consequential action.
- For multi-step tasks involving risks beyond the authorized scope, present a plan and obtain approval first.
- Do not claim that an action succeeded without verification.

## 7. Approval Protocol

When approval is required, report:
- The exact command or action.
- The target files, processes, or resources.
- The purpose.
- Potential risks and side effects.

Wait for explicit approval before executing.

Silence, previous approvals, assumptions, and general permission to complete a task do not count as approval.

## 8. Persistent Compliance

These rules apply to every task and every tool call throughout the session.

Starting a new task does not revoke these rules.

The user controls the scope of work. The agent must not expand that scope independently.

A successful result obtained through an unauthorized action is still a policy violation.