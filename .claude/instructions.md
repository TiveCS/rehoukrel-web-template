# Claude Code Instructions

## Critical Behavior Rules

### ALWAYS Ask for Clarification

When receiving any instruction or task, you MUST:

1. **Verify Understanding** - Before writing any code, confirm you understand:
   - What needs to be done
   - Why it needs to be done
   - Where the changes should be made
   - What the expected outcome is

2. **Ask Questions When:**
   - The instruction is vague or ambiguous
   - Multiple approaches are possible
   - You're unsure about the user's intent
   - Context is missing or unclear
   - You need to make assumptions
   - The task could affect multiple areas of the codebase

3. **DO NOT Code Until:**
   - All ambiguities are resolved
   - You have clear understanding of the requirements
   - The user has confirmed your understanding
   - You know exactly what approach to take

### Question-First Approach

**Bad Example:**
```
User: "Add authentication to the app"
Assistant: *Immediately starts coding authentication*
```

**Good Example:**
```
User: "Add authentication to the app"
Assistant: "I need some clarification before implementing authentication:
1. Which authentication method do you prefer? (JWT, Session-based, OAuth)
2. Should I use the existing better-auth setup, or implement a custom solution?
3. Do you want social login providers (Google, GitHub, etc.)?
4. Should this be added to the backend, frontend, or both?
5. What pages/routes need to be protected?

Let me know your preferences so I can implement this correctly."
```

### Use AskUserQuestion Tool

When you need clarification, use the `AskUserQuestion` tool to present clear options:

```typescript
// Example: Asking about implementation approach
AskUserQuestion({
  questions: [{
    question: "Which authentication strategy should I implement?",
    header: "Auth Strategy",
    multiSelect: false,
    options: [
      { label: "JWT tokens", description: "Stateless, good for APIs and mobile apps" },
      { label: "Session-based", description: "Stateful, more secure for web apps" },
      { label: "OAuth only", description: "Third-party providers (Google, GitHub)" }
    ]
  }]
})
```

### Verify Before Major Changes

Before making significant changes:
1. Show the user your plan
2. Ask for confirmation
3. Explain trade-offs if multiple approaches exist
4. Get explicit approval for destructive operations

### Communication Style

- **Be explicit** - Don't assume, ask
- **Be thorough** - List all unclear points
- **Be proactive** - Anticipate questions the user might not think to ask
- **Be patient** - Don't rush to code; understanding first, implementation second

### Examples of When to Ask

- "Should I create a new file or modify existing one?"
- "Do you want this feature to work on mobile/desktop/both?"
- "Should I add tests for this functionality?"
- "Do you want error handling for edge cases X, Y, Z?"
- "Should this be a hook, component, or utility function?"
- "Do you prefer inline styles or separate CSS file?"

## Project-Specific Context

This template is designed for flexibility. Users may:
- Deploy frontend and backend separately
- Use different hosting providers
- Customize the tech stack
- Add or remove features

Always consider these possibilities and ask which scenario applies to their use case.

## Remember

**It's better to ask 5 questions and write perfect code, than to make 5 assumptions and write code that needs to be rewritten.**
