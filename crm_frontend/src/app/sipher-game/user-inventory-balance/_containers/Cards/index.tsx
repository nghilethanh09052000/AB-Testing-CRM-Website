"use client";

import React from "react";
import { useState, useEffect } from "react";
import { UserInventoryBalance } from "@/types/api/sipherGame";
import AutoComplete from "@/components/Autocomplete/Autocomplete";
type AutoCompleteOption = { value: string; label: string };

interface UserInfo {
  ather_id: string;
  email: string;
  ather_user_name: string;
  game_user_id: string;
}

interface UserInventoryBalanceCards {
  userInfo: UserInfo[]
  instanceIds: AutoCompleteOption[]
}

const UserInventoryBalanceCards = ({ userInfo, instanceIds }: UserInventoryBalanceCards) => {
  const userInfoOptions = {
    atherId: userInfo.map((user) => ({
      label: user.ather_id,
      value: user.ather_id,
    })),
    email: userInfo.map((user) => ({ label: user.email, value: user.email })),
    atherUserName: userInfo.map((user) => ({
      label: user.ather_user_name,
      value: user.ather_user_name,
    })),
    gameUserId: userInfo.map((user) => ({
      label: user.game_user_id,
      value: user.game_user_id,
    })),
  };

  const [selectedAtherId, setSelectedAtherId] = useState<AutoCompleteOption[]>(
    [],
  );
  const [selectedEmail, setSelectedEmail] = useState<AutoCompleteOption[]>([]);
  const [selectedAtherUserName, setSelectedAtherUserName] = useState<
    AutoCompleteOption[]
  >([]);
  const [selectedGameUserId, setSelectedGameUserId] = useState<
    AutoCompleteOption[]
  >([]);

  const [filteredUserInfo, setFilteredUserInfo] =
    useState<UserInfo[]>(userInfo);


  useEffect(() => {
    const filterUserInfo = userInfo.filter(
      (user) =>
        selectedAtherId.some((option) => option.value === user.ather_id) ||
        selectedEmail.some((option) => option.value === user.email) ||
        selectedAtherUserName.some(
          (option) => option.value === user.ather_user_name,
        ) ||
        selectedGameUserId.some((option) => option.value === user.game_user_id),
    );

    setFilteredUserInfo(filterUserInfo);
  }, [
    selectedAtherId,
    selectedEmail,
    selectedAtherUserName,
    selectedGameUserId,
    userInfo,
  ]);

  return (
    
      <div className="mb-5 grid grid-cols-3 gap-7.5 sm:grid-cols-3 xl:grid-cols-3">
        <div className="gird grid-cols-1">
          <p className="text-title-sm">Ather Id</p>
          <AutoComplete
            value={selectedAtherId}
            options={userInfoOptions.atherId}
            onChange={(value: AutoCompleteOption | AutoCompleteOption[]) =>
              setSelectedAtherId(Array.isArray(value) ? value : [value])
            }
            placeholder={""}
            isDisabled={false}
            isMulti={true}
          />
        </div>
        <div className="gird grid-cols-1">
          <p className="text-title-sm">Ather User Name</p>
          <AutoComplete
            value={selectedAtherUserName}
            options={userInfoOptions.atherUserName}
            onChange={(value: AutoCompleteOption | AutoCompleteOption[]) =>
              setSelectedAtherUserName(Array.isArray(value) ? value : [value])
            }
            placeholder={""}
            isDisabled={false}
            isMulti={true}
          />
        </div>
        <div className="gird grid-cols-1">
          <p className="text-title-sm">Ather Email</p>
          <AutoComplete
            value={selectedEmail}
            options={userInfoOptions.email}
            onChange={(value: AutoCompleteOption | AutoCompleteOption[]) =>
              setSelectedEmail(Array.isArray(value) ? value : [value])
            }
            placeholder={""}
            isDisabled={false}
            isMulti={true}
          />
        </div>
        <div className="gird grid-cols-1">
          <p className="text-title-sm">Gamer User Id</p>
          <AutoComplete
            value={selectedGameUserId}
            options={userInfoOptions.gameUserId}
            onChange={(value: AutoCompleteOption | AutoCompleteOption[]) =>
              setSelectedGameUserId(Array.isArray(value) ? value : [value])
            }
            placeholder={""}
            isDisabled={false}
            isMulti={true}
          />
        </div>
        <div className="gird grid-cols-1">
          <p className="text-title-sm">Instance Id</p>
          <AutoComplete
            value={selectedGameUserId}
            options={instanceIds}
            onChange={(value: AutoCompleteOption | AutoCompleteOption[]) =>
                true
            }
            placeholder={""}
            isDisabled={false}
            isMulti={true}
          />
        </div>
      </div>
  
  );
};

export default UserInventoryBalanceCards;
