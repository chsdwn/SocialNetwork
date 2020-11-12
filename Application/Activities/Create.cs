using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = new Guid(),
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    City = request.City,
                    Venue = request.Venue,
                    Date = request.Date
                };
                _dbContext.Add(activity);

                var success = await _dbContext.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}