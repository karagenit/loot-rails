require 'test_helper'

class LootControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get loot_index_url
    assert_response :success
  end

end
