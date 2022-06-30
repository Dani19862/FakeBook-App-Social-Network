using System.Threading.Tasks;

namespace API.interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get;  }

        IPostRepository PostRepository { get;  }

        ICommentRepository CommentRepository { get;  }

        ILikeRepository LikeRepository { get;  }

        IMessageRepository MessageRepository { get;  }

        Task<bool> Complete();

        bool HasChanges();

    }
}