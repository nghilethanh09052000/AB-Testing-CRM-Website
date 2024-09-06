"use client";

import React from "react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardsItemTwo from "@/components/cards/CardsItemTwo";
import Link from "next/link";
import Social from "@/app/(home)/_containers/social/Social";
import DataTableOne from "@/components/DataTables/DataTableOne";
import { ZendeskTicket } from "@/types/api/social";
import AutoComplete from "@/components/Autocomplete/Autocomplete";
type AutoCompleteOption = { value: string; label: string };

interface UserInfo {
  ather_id: string;
  email: string;
  ather_user_name: string;
  game_user_id: string;
}

interface HomePageProps {
  userInfo: UserInfo[];
  zendeskTickets: ZendeskTicket[];
}

const HomePage = ({ userInfo, zendeskTickets }: HomePageProps) => {
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
  const [filteredZendeskTickets, setFilteredZendeskTickets] =
    useState<ZendeskTicket[]>(zendeskTickets);

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

  const cardsItemTwoData = [
    {
      cardImageSrc: "/images/cards/card-1.webp",
      cardTitle: (
        <p className="pointer-events-none text-title-md text-orange-700">
          Sipher Game
        </p>
      ),
      cardContent: (
        <Link href="/sipher-game/overview">
          Click to see Sipher Game Dashboard
        </Link>
      ),
      children: (
        <div className="mt-5">
          <DataTableOne
            results={filteredUserInfo}
            columns={[
              {
                Header: "Ather Id",
                accessor: "ather_id",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Ather User Name",
                accessor: "ather_user_name",
              },
              {
                Header: "Game User Id",
                accessor: "game_user_id",
              },
              {
                Header: "Game User Name",
                accessor: "game_user_name",
              },
              {
                Header: "Created Timestamp",
                accessor: "ather_created_timestamp",
              },
              {
                Header: "Game Day 0 Datetime",
                accessor: "game_day0_datetime_tzutc",
              },
            ]}
          />
        </div>
      ),
    },
    {
      cardImageSrc: "/images/cards/card-3.webp",
      cardTitle: <p className="text-title-md text-sky-700">Social</p>,
      cardContent: (
        <Link href="/social/overview">
          Click to see Sipher Social Dashboard
        </Link>
      ),
      children: <Social zendeskTickets={zendeskTickets} />,
    },
    {
      cardImageSrc: "/images/cards/card-2.webp",
      cardTitle: <p className="text-title-md text-blue-600">Blockchain</p>,
      cardContent: (
        <Link href="/blockchain/overview">
          Click to see Sipher Blockchain Dashboard
        </Link>
      ),
    },
    {
      cardImageSrc: "/images/cards/card-4.png",
      cardTitle: <p className="text-title-md text-purple-700">Ather System</p>,
      cardContent: (
        <Link href="/ather-system/overview">
          Click to see Sipher Ather System Dashboard
        </Link>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Home Page" />
      <div className="mb-5 grid grid-cols-4 gap-7.5 sm:grid-cols-4 xl:grid-cols-4">
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
      </div>

      <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-1 xl:grid-cols-1">
        {cardsItemTwoData.map((card, key) => (
          <CardsItemTwo
            key={card.cardImageSrc}
            cardImageSrc={card.cardImageSrc}
            cardTitle={card.cardTitle}
            cardContent={card.cardContent}
          >
            {card.children}
          </CardsItemTwo>
        ))}
      </div>
    </>
  );
};

export default HomePage;
