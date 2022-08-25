using System.Runtime.CompilerServices;

namespace RxJSData
{
    public class Lists
    {
        //to understand: https://oleh-zheleznyak.blogspot.com/2020/07/enumeratorcancellation.html
        public async IAsyncEnumerable<KeyValuePair<long, string>> GetTicks(int? millisecondsDelay, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            long nr = 0;
            millisecondsDelay ??= 3_000;
            while (true)
            {
                yield return new KeyValuePair<long, string>(++nr, DateTime.UtcNow.Ticks.ToString());
                await Task.Delay(millisecondsDelay.Value, cancellationToken);
            }
        }

        public async IAsyncEnumerable<KeyValuePair<long, string>> GetNumbers(long? startFrom, long? count,long? repeat ,int? millisecondsDelay, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            long nr = 0;
            millisecondsDelay ??= 3_000;
            startFrom ??= 0;
            count ??= 10;
            repeat ??= 1;

            while (nr<=count)
            {
                for (int i = 0; i < repeat; i++)
                {
                    yield return new KeyValuePair<long, string>(++nr, startFrom.Value.ToString());
                    await Task.Delay(millisecondsDelay.Value, cancellationToken);
                }
                startFrom++;
                //await Task.Delay(millisecondsDelay.Value, cancellationToken);
            }
        }
    }
}