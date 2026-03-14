import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

interface CommentsSectionProps {
  postId: number;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data: comments, isLoading } = trpc.community.getComments.useQuery({ postId });

  const createComment = trpc.community.createComment.useMutation({
    onSuccess: () => {
      setCommentText("");
      toast.success("Comentário adicionado!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao adicionar comentário");
    },
  });

  const deleteComment = trpc.community.deleteComment.useMutation({
    onSuccess: () => {
      toast.success("Comentário removido!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao remover comentário");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Faça login para comentar");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Escreva um comentário");
      return;
    }

    createComment.mutate({
      postId,
      content: commentText,
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comentários ({comments?.length || 0})</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Adicione um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!user}
          />
          <Button type="submit" disabled={createComment.isPending || !user}>
            {createComment.isPending ? "..." : "Enviar"}
          </Button>
        </div>
        {!user && <p className="text-xs text-muted-foreground">Faça login para comentar</p>}
      </form>

      {/* Comments List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando comentários...</p>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm">{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {user?.id === comment.userId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteComment.mutate({
                        commentId: comment.id,
                        postId,
                      })
                    }
                    disabled={deleteComment.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum comentário ainda</p>
        )}
      </div>
    </div>
  );
}
