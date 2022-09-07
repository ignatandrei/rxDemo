using Microsoft.AspNetCore.Mvc;
using RxJSData;
using System.Runtime.CompilerServices;

namespace RxJSDemoWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ListsController : ControllerBase
    {


        private readonly ILogger<ListsController> _logger;
        private readonly Lists lists;

        public ListsController(ILogger<ListsController> logger, Lists lists)
        {
            _logger = logger;
            this.lists = lists;
        }
        [HttpGet("{millisecondsDelay}")]
        public IAsyncEnumerable<KeyValuePair<long, string>> GetTicks(int? millisecondsDelay, CancellationToken cancellationToken)
        {
            return this.lists.GetTicks(millisecondsDelay, cancellationToken);
        }
        [HttpGet("{startFrom?}/{count?}/{repeat?}/{millisecondsDelay?}")]
        public IAsyncEnumerable<KeyValuePair<long, string>> GetNumbers(long? startFrom, long? count, long? repeat, int? millisecondsDelay, CancellationToken cancellationToken)
        {
            return this.lists.GetNumbers(startFrom, count, repeat, millisecondsDelay, cancellationToken);
        }
        [HttpGet("{name}/{millisecondsDelay?}")]
        public  IAsyncEnumerable<KeyValuePair<long, string>> GetCountries(string name, int? millisecondsDelay,  CancellationToken cancellationToken)
        {
            return this.lists.GetCountries(name, millisecondsDelay,cancellationToken);
        }
    }
}