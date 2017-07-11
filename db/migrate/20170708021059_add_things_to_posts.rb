class AddThingsToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :head, :string
    add_column :posts, :top, :string
    add_column :posts, :bottom, :string
    add_column :posts, :hair, :string
    add_column :posts, :shoe, :string
    add_column :posts, :eye, :string
    add_column :posts, :eyebrow, :string
    add_column :posts, :nose, :string
    add_column :posts, :mouth, :string
    add_column :posts, :facehair, :string
  end
end
