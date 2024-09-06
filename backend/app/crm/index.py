import requests
import pandas as pd
import os
# Replace these variables with your own Zendesk information
subdomain = 'sipher'
token = 'hOOFBdTfga85PDMH4nldqSiCs4IxNb7lpgRMxnXQ'
email = 'susan.pham@atherlabs.com'

# Zendesk API endpoint for fetching tickets
url = f'https://{subdomain}.zendesk.com/api/v2/tickets.json'

# Encode the API token in the Authorization header
auth = (email + '/token', token)


# Function to get all tickets
def get_all_tickets(url, auth):
    tickets = []
    while url:
        response = requests.get(url, auth=auth)
        if response.status_code != 200:
            raise Exception(f"Request failed with status {response.status_code}")
        
        data = response.json()
        tickets.extend(data['tickets'])
        url = data['next_page']  # URL for the next page of results
    
    return tickets

# Function to get user information by user ID
user_cache = {}
# Function to get user information by user ID
def get_user_info(user_id, subdomain, auth):
    if user_id is None:
        return None
    if user_id in user_cache:
        print(f'user_id: {user_id} EXSIT')
        return user_cache[user_id]
    
    user_url = f'https://{subdomain}.zendesk.com/api/v2/users/{user_id}.json'
    response = requests.get(user_url, auth=auth)
    if response.status_code != 200:
        raise Exception(f"Request failed with status {response.status_code}")
    
    user_cache[user_id] = response.json()['user']
    print(f'Get user_id: {user_id}')
    return user_cache[user_id]

# Function to process tickets and flatten array fields
def process_tickets(tickets, subdomain, auth):
    processed_tickets = []
    for ticket in tickets:
        # Flatten array fields
        ticket['tags'] = ', '.join(ticket.get('tags', []))
        ticket['custom_fields'] = ', '.join([f"{cf['id']}: {cf['value']}" for cf in ticket.get('custom_fields', [])])
        ticket['fields'] = ', '.join([f"{field['id']}: {field['value']}" for field in ticket.get('fields', [])])
        ticket['collaborator_ids'] = ', '.join(map(str, ticket.get('collaborator_ids', [])))
        ticket['follower_ids'] = ', '.join(map(str, ticket.get('follower_ids', [])))
        ticket['email_cc_ids'] = ', '.join(map(str, ticket.get('email_cc_ids', [])))
        ticket['sharing_agreement_ids'] = ', '.join(map(str, ticket.get('sharing_agreement_ids', [])))
        ticket['followup_ids'] = ', '.join(map(str, ticket.get('followup_ids', [])))
        
        # Extract only the 'channel' field from the 'via' dictionary
        ticket['channel'] = ticket['via']['channel']
        del ticket['via']  # Remove the 'via' dictionary
        
        # Get user information
        assignee_info = get_user_info(ticket.get('assignee_id'), subdomain, auth)
        submitter_info = get_user_info(ticket.get('submitter_id'), subdomain, auth)
        requester_info = get_user_info(ticket.get('requester_id'), subdomain, auth)
        
        ticket['assignee_name'] = assignee_info['name'] if assignee_info else None
        ticket['assignee_email'] = assignee_info['email'] if assignee_info else None
        
        ticket['submitter_name'] = submitter_info['name'] if submitter_info else None
        ticket['submitter_email'] = submitter_info['email'] if submitter_info else None
        
        ticket['requester_name'] = requester_info['name'] if requester_info else None
        ticket['requester_email'] = requester_info['email'] if requester_info else None
        
        processed_tickets.append(ticket)
    
    return processed_tickets

# Fetch all tickets
try:
    all_tickets = get_all_tickets(url, auth)
    print(f"Total tickets fetched: {len(all_tickets)}")

    # Process tickets to flatten array fields and include user info
    processed_tickets = process_tickets(all_tickets, subdomain, auth)

    # Convert the list of tickets to a pandas DataFrame
    df = pd.DataFrame(processed_tickets)

    # Print the DataFrame
    print(df)

    # If needed, save the DataFrame to a CSV file
    df.to_csv('zendesk_tickets.csv', index=False)

except Exception as e:
    print(f"An error occurred: {e}")