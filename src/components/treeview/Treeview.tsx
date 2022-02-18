import { Button } from '@mui/material';
import * as React from 'react';
import { GithubServiceLocator } from '../github/domain/GithubServiceLocator';
import TreeviewItems from './TreeviewItems';

export interface ITreeviewProps {
}

export interface ITreeviewState {
}

export default class Treeview extends React.Component<ITreeviewProps, ITreeviewState> {
  serviceLocator: GithubServiceLocator;

  constructor(props: ITreeviewProps) {
    super(props);
    this.serviceLocator = new GithubServiceLocator();

    this.state = {
    }
  }

  public render() {
    const items = this.serviceLocator.execute({model: undefined, id:1});//load first set of nodes for tree

    return (
      <TreeviewItems items={items} />
    )
  }
}
