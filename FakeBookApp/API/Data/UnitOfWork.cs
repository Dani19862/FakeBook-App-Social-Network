using System.Threading.Tasks;
using API.interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
   
    public class UnitOfWork: IUnitOfWork
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            
        }
     
        public IUserRepository UserRepository => new UserRepository(_context, _mapper ); 
        
        public IPostRepository PostRepository => new PostRepository(_context , _mapper);

        public ICommentRepository CommentRepository => new CommentRepository(_context, _mapper);

        public ILikeRepository LikeRepository => new LikeRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            
            return _context.ChangeTracker.HasChanges();
        }

    }
}