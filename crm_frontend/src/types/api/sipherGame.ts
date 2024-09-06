
export interface UserInfo {
    ather_id: string;
    email: string;
    ather_user_name: string;
    game_user_id: string;
    // Add more properties if needed
  }


export interface UserInventoryBalance {
  user_id: string;
  ather_id: string;
  email: string;
  ather_user_name: string;
  instance_id: string;
  updated_balance_date: string;
  updated_balance: number;
  previous_balance: number;
  change_in_balance: number;
  balance_change_type: string;
  latest_timestamp: boolean;
}