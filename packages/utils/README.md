# @xiaohei998/utils

Shared utility functions for JavaScript/TypeScript projects.

## Installation

```bash
pnpm add @xiaohei998/utils
# or
npm install @xiaohei998/utils
```

## Usage

```typescript
import { debounce } from '@xiaohei998/utils';

const save = debounce(() => {
  console.log('saved');
}, 300);

save();
save.cancel();
```

## API

### `debounce(fn, wait, options?)`

Debounce a function call with optional leading/trailing edge behavior.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fn` | `Function` | Function to debounce |
| `wait` | `number` | Delay in milliseconds |
| `options.leading` | `boolean` | Invoke on leading edge (default: `false`) |
| `options.trailing` | `boolean` | Invoke on trailing edge (default: `true`) |

Returns a debounced function with `cancel()` and `flush()` helpers.

## License

MIT
