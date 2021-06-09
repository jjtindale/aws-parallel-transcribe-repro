# Setup
`npm install`

# Transcribe in Series
`npm run series`

## Expected result
We expect to see the transcription being logged over time as the files are played. We should see results from `numbers.wav` followed by results from `letters.wav`, so something like:
```
1
12
123
...
123456789 10
A
AB
ABC
ABCD
...
ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

## Actual result
```
joe@Joes-MacBook-Pro amazon-transcribe-error % npm run series

> amazon-transcribe-error@1.0.0 series /Users/joe/Development/amazon-transcribe-error
> ts-node src/series.ts

starting transcription
transcribing in series
transcribing /Users/joe/Development/amazon-transcribe-error/numbers.wav
undefined
undefined
One.
12.
123
1234
12345
undefined
123456
123456 sev.
1234567
undefined
12345678
123456789
123456789
123456789 10.
123456789 10.
123456789 10.
undefined
transcribing /Users/joe/Development/amazon-transcribe-error/letters.wav
{
  name: 'BadRequestException',
  '$fault': 'client',
  '$metadata': {
    httpStatusCode: undefined,
    requestId: undefined,
    extendedRequestId: undefined,
    cfId: undefined
  },
  Message: 'Your stream is too big. Reduce the frame size and try your request again.'
}
```

# Transcribe in Parallel
`npm run parallel`

## Expected result
We expect to see the transcription being logged over time as the files are played. We should see results from `numbers.wav` interleaved with results from `letters.wav`, so something like:
```
1
A
12
AB
ABC
ABCD
123
...
```

## Actual result
```
joe@Joes-MacBook-Pro amazon-transcribe-error % npm run parallel

> amazon-transcribe-error@1.0.0 parallel /Users/joe/Development/amazon-transcribe-error
> ts-node src/parallel.ts

starting transcription
transcribing in parallel
transcribing /Users/joe/Development/amazon-transcribe-error/numbers.wav
transcribing /Users/joe/Development/amazon-transcribe-error/letters.wav
Error: AWS SDK error wrapper for undefined
    at asSdkError (/Users/joe/Development/amazon-transcribe-error/node_modules/@aws-sdk/middleware-retry/src/StandardRetryStrategy.ts:124:10)
    at StandardRetryStrategy.retry (/Users/joe/Development/amazon-transcribe-error/node_modules/@aws-sdk/middleware-retry/src/StandardRetryStrategy.ts:94:21)
    at processTicksAndRejections (internal/process/task_queues.js:97:5) {
  '$metadata': { attempts: 1, totalRetryDelay: 0 }
}
undefined
undefined
One.
12.
123
1234
12345
undefined
123456
123456 sev.
1234567
undefined
12345678
123456789
123456789
123456789 10.
123456789 10.
123456789 10.
undefined

```

In both cases the second file is never transcribed. The program hangs.