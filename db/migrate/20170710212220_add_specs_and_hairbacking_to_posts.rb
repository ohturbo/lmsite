class AddSpecsAndHairbackingToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :spectacles, :string
    add_column :posts, :hairbacking, :string
  end
end
