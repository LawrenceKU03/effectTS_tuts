# effectts

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.9. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


# Effect-TS Learning Roadmap

A beginner → intermediate path through Effect-TS, organized in stages that build on each other.

---

## Stage 1 — Core Mental Model

- `Effect<A, E, R>` — success / error / requirements channels
- `Effect.succeed`, `Effect.fail`, `Effect.sync`, `Effect.tryPromise`
- `Effect.gen` + `yield*`
- `pipe` and method-chaining style (`.pipe(Effect.map(...), Effect.flatMap(...))`)
- Running effects: `Effect.runSync`, `Effect.runPromise`, `Effect.runFork`

**Goal:** be able to explain why Effect is lazy and Promises aren't, without hesitating.

---

## Stage 2 — Error Handling

- `Data.TaggedError` vs plain `Error` vs `Data.Case`
- `Effect.catchTag`, `Effect.catchTags`, `Effect.catchAll`
- `Effect.mapError`, `Effect.orElse`
- Expected failures (typed, in `E`) vs defects (`Effect.die`, unexpected bugs)

**Exercise:** rewrite a fetch-with-retry function using 2–3 different tagged error types and handle each differently with `catchTags`.

---

## Stage 3 — Context & Dependency Injection

- `Context.Tag`
- `Layer` — building/composing layers (`Layer.succeed`, `Layer.effect`, `Layer.merge`)
- `Effect.provide` vs `Effect.provideService`
- Why this exists: testability — swap a live `HttpClient` layer for a mock one

**Exercise:** take a simple `getFn` (fetch-by-URL) function and refactor it to pull an `HttpClient` service from `Context` instead of importing `axios` directly. Write two layers: one real, one fake that returns canned data.

---

## Stage 4 — Composition & Concurrency

- `Effect.all` (sequential vs `{ concurrency: n }`)
- `Effect.forEach`
- `Effect.race`, `Effect.timeout`
- `Fiber` basics — what a fiber is, `Effect.fork`, `Fiber.join`

**Goal:** understand when Effect is doing work in parallel vs sequentially, and control it explicitly.

---

## Stage 5 — Resource Safety

- `Scope`
- `Effect.acquireRelease` / `Effect.acquireUseRelease`
- Why this beats manual `try/finally` (guaranteed cleanup even on interruption)

**Exercise:** wrap a DB connection or file handle open/close in `acquireRelease`.

---

## Stage 6 — Resilience

- `Schedule` — retry policies, backoff strategies
- `Effect.retry`, `Effect.repeat`
- Combining with tagged errors (retry only on network-type errors, not on parse errors)

---

## Stage 7 — Intermediate → Advanced (optional for now)

- `Stream` module — for sequences of async data
- `Effect.Service` (newer, more ergonomic alternative to manual `Context.Tag` + `Layer` boilerplate)
- Testing with `@effect/vitest` or `TestClock` / `TestContext`

---

## Resources

- **Official docs** — [effect.website](https://effect.website) — the "Guides" section maps almost 1:1 to the stages above
- **Effect Discord** — active community, good for unsticking specific errors
- **GitHub: effect-ts/effect** examples folder — real composed code, useful once Stage 2–3 feel solid
- Avoid random blog posts / YouTube unless recently dated — the API has changed a lot across major versions, and older content teaches outdated patterns

---

## Suggested Pace

Don't rush past Stage 3 — most real confusion in Effect comes from `R` / `Context` / `Layer`. Once that clicks, Stages 4–6 go fast since they're mostly new combinators applied to a model you already understand.
