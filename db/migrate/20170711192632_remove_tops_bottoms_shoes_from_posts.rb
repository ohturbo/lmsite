class RemoveTopsBottomsShoesFromPosts < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :shoe, :string
    remove_column :posts, :top, :string
    remove_column :posts, :bottom, :string
  end
end
