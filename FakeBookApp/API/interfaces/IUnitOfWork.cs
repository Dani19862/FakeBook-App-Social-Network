using System.Threading.Tasks;

namespace API.interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get;  }

        IPostRepository PostRepository { get;  }

        ICommentRepository CommentRepository { get;  }

        Task<bool> Complete();

        bool HasChanges();

    }
}