import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    const { channel } = useChatContext();

    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if (isEditing) {
        return (
            <EditChannel />
        )
    }

    return (
        <div>

        </div>
    )
}

export default ChannelContainer;
