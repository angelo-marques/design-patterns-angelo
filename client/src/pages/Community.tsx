import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import CreatePostModal from "@/components/CreatePostModal";
import CommunityPostCard from "@/components/CommunityPostCard";
import CommentsSection from "@/components/CommentsSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const PATTERNS = ["Todos", "Singleton", "Factory Method", "Abstract Factory", "Builder", "Adapter", "Decorator", "Facade", "Observer", "Strategy"];

export default function Community() {
  const { user } = useAuth();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [patternFilter, setPatternFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading, refetch } = trpc.community.listPosts.useQuery({
    limit: 50,
    offset: 0,
  });

  const { data: selectedPost } = trpc.community.getPost.useQuery(
    { postId: selectedPostId! },
    { enabled: selectedPostId !== null }
  );

  const filteredPosts = posts?.filter((post) => {
    const matchesPattern = patternFilter === "Todos" || post.patternId === patternFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPattern && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Comunidade</h1>
              <p className="text-slate-400 mt-1">Compartilhe e discuta padrões de design com a comunidade</p>
            </div>
            {user && <CreatePostModal onPostCreated={() => refetch()} />}
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Buscar posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700"
                />
              </div>
            </div>
            <Select value={patternFilter} onValueChange={setPatternFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PATTERNS.map((pattern) => (
                  <SelectItem key={pattern} value={pattern}>
                    {pattern}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="cursor-pointer"
              >
                <CommunityPostCard
                  post={post}
                  onCommentClick={() => setSelectedPostId(post.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">Nenhum post encontrado</p>
            {user && (
              <p className="text-slate-500 text-sm mt-2">
                Seja o primeiro a compartilhar um post sobre padrões de design!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Post Details Modal */}
      <Dialog open={selectedPostId !== null} onOpenChange={(open) => !open && setSelectedPostId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPost.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {selectedPost.patternId && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {selectedPost.patternId}
                    </span>
                  )}
                  {selectedPost.language && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {selectedPost.language === "csharp" ? "C#" : selectedPost.language}
                    </span>
                  )}
                </div>

                <p className="text-slate-300">{selectedPost.content}</p>

                {selectedPost.codeSnippet && (
                  <div className="bg-slate-900 rounded p-4 overflow-x-auto">
                    <pre className="text-sm text-slate-300 font-mono">
                      {selectedPost.codeSnippet}
                    </pre>
                  </div>
                )}

                {selectedPost.tags && (
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.split(",").map((tag) => (
                      <span key={tag.trim()} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-slate-700 pt-4">
                  <CommentsSection postId={selectedPost.id} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
