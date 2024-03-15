-- DropIndex
DROP INDEX "Comment_userId_postId_key";

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");
