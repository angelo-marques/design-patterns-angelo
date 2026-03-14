import { CommunityPost } from "@shared/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Code } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";

interface CommunityPostCardProps {
  post: CommunityPost;
  onCommentClick?: (postId: number) => void;
}

export default function CommunityPostCard({ post, onCommentClick }: CommunityPostCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const likePost = trpc.community.likePost.useMutation({
    onSuccess: () => {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onError: () => {
      toast.error("Erro ao curtir post");
    },
  });

  const unlikePost = trpc.community.unlikePost.useMutation({
    onSuccess: () => {
      setLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    },
    onError: () => {
      toast.error("Erro ao descurtir post");
    },
  });

  const handleLike = () => {
    if (!user) {
      toast.error("Faça login para curtir posts");
      return;
    }

    if (liked) {
      unlikePost.mutate({ postId: post.id });
    } else {
      likePost.mutate({ postId: post.id });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              {post.patternId && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {post.patternId}
                </span>
              )}
              {post.language && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  {post.language === "csharp" ? "C#" : post.language}
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{formatDate(post.createdAt)}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-3">{post.content}</p>

        {post.codeSnippet && (
          <div className="bg-slate-900 rounded p-3 overflow-x-auto">
            <pre className="text-xs text-slate-300 font-mono line-clamp-4">
              {post.codeSnippet}
            </pre>
          </div>
        )}

        {post.tags && (
          <div className="flex flex-wrap gap-1">
            {post.tags.split(",").map((tag) => (
              <span key={tag.trim()} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={handleLike}
            disabled={likePost.isPending || unlikePost.isPending}
          >
            <Heart
              className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
            {likeCount}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => onCommentClick?.(post.id)}
          >
            <MessageCircle className="w-4 h-4" />
            {post.commentCount || 0}
          </Button>

          {post.codeSnippet && (
            <Button variant="ghost" size="sm" className="gap-1 text-xs ml-auto">
              <Code className="w-4 h-4" />
              Ver Código
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
